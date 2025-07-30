import Article from '../pages/admin/article/article.tsx';
import AdminLayout from '../pages/admin/layout/AdminLayout.tsx'
import Trash from '../pages/admin/article/trash.tsx';
import CreateArticle from '../pages/admin/article/create.tsx';
import UpdateArticle from '../pages/admin/article/update.tsx';
import Login from '../pages/admin/auth/login.tsx';
import User from '../pages/admin/user/user.tsx'
import AuthMiddleware from '../pages/admin/auth/auth.tsx';

export const admin = [
  {
    path: "/admin",
    element: (
      <AuthMiddleware>  
        <AdminLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "article/trash",
        element: <Trash />
      },
      {
        path: "article/create",
        element: <CreateArticle action_url={'/admin/article'} />
      },
      {
        path: "article/update",
        element: <UpdateArticle action_url={'/admin/article'}/>
      },
      {
        path: "user",
        element: <User />
      }
    ]
  },
  {
    path: "admin/auth/login",
    element: <Login />
  }
]