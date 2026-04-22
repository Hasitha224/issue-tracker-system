import Issue from '../models/issueModal.js';
import mongoose from 'mongoose';

export const issueCreate = async (req,res) => {
    try {
        const { title, description, status, severity, priority } = req.body;
        const issue = new Issue({
            title,
            description,
            status,
            severity,
            priority,
            user: req.user._id,
        });
        const savedIssue = await issue.save();
        return res.status(201).json({
            data: savedIssue,
            message: "Issue created successfully"
        });
    } catch(error) {
        console.error("Error creating issue ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const issueEdit = async (req,res) => {
    const issueId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        return res.status(400).json({ message: "Invalid issue ID" });
    }
    
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            issueId,
            req.body,
            { new: true, runValidators: true },
        ).populate("user", "firstName lastName email");
        if(!updatedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        return res.status(200).json({
            data: updatedIssue,
            message: "Issue updated successfully",
        });
    } catch(error) {
        console.error("Error updating issue ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllIssues = async (req,res) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const { search, severity, priority, status } = req.query;
        let filter = {};
        if (search) {
            const isObjectId = mongoose.Types.ObjectId.isValid(search);

            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                ...(isObjectId ? [{ _id: search }] : [])
            ];
        }
        if (priority) {
            filter.priority = priority;
        }
        if (severity) {
            filter.severity = severity;
        }
        if (status) {
            filter.status = status;
        }

        const issues = await Issue.find(filter)
            .populate("user", "firstName lastName email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const total = await Issue.countDocuments(filter);
        
        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: issues
        });
    } catch (error) {
        console.error('Error fetching issues:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getIssueById = async (req,res) => {
    const issueId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        return res.status(400).json({ message: "Invalid issue ID" });
    }

    try {
        const getData = await Issue.findById(issueId).populate("user", "firstName lastName email");
        if (getData) {
            return res.status(200).json(getData);
        } else {
            return res.status(404).json({ message: "Issue not found" });
        }  
    } catch(error){
        console.error('Error in fetching issue', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteIssueById = async (req,res) => {
    const issueId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        return res.status(400).json({ message: "Invalid issue ID" });
    }

    try {
        const deleteData = await Issue.findByIdAndDelete(issueId);
        if (deleteData) {
            return res.status(200).json({ message: "Issue deleted successfully" });
        } else {
            return res.status(404).json({ message: "Issue not found" });
        }  
    } catch(error){
        console.error('Error in deleting issue', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const issueStatusUpdate = async (req,res) => {
    const issueId = req.params.id;
    const { status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        return res.status(400).json({ message: "Invalid issue ID" });
    }

    const allowedStatuses = ['open', 'in_progress', 'resolved'];
    if(!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
       const updatedIssue = await Issue.findByIdAndUpdate(
        issueId,
        { status },
        { new: true, runValidators: true },
       );
       return res.status(200).json(updatedIssue);
    } catch (error) {
        console.error('Error updating status of issue', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const issueCountsDisplayByStatus = async (req,res) => {
    try {
        const counts = await Issue.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1},
                }
            }
        ])
        const results = {
            open: 0,
            in_progress: 0,
            resolved: 0,
        }
        counts.forEach(item => {
            results[item._id] = item.count;
        })
        return res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching issues counts', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
