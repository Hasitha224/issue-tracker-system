import { Router } from 'express';
import { issueCreate, issueEdit, getAllIssues, getIssueById, deleteIssueById, issueCountsDisplayByStatus, issueStatusUpdate} from '../controllers/issueController.js';
import verifyToken from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', verifyToken, getAllIssues);
router.post('/create',verifyToken, issueCreate);
router.get('/count',verifyToken, issueCountsDisplayByStatus);
router.get('/:id', verifyToken, getIssueById);
router.patch('/edit/:id', verifyToken, issueEdit);
router.delete('/delete/:id', verifyToken, deleteIssueById);
router.patch('/status/update/:id', verifyToken, issueStatusUpdate);

export default router;
