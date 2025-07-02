import express from 'express';
const blogRouter = express.Router();
import { postBlog, getAllBlogs, deleteBlog, updateBlog ,   getBlogById} from '../controller/blogController.js';
import verifyUserMiddleware from '../middleware/verifyUserMiddleware.js';

blogRouter.post('/post-blog', verifyUserMiddleware, postBlog)
    .get('/get-all-blogs', getAllBlogs)
    .get('/:id',getBlogById) // ✅ Add this route
    .delete('/delete-blog/:blogid/:userid', verifyUserMiddleware, deleteBlog)
    .put('/update-blog/:blogid/:userid', verifyUserMiddleware, updateBlog)






export default blogRouter;