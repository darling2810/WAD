import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String user = req.getParameter("username");
        String pass = req.getParameter("password");
        // Simplified authentication
        if ("admin".equals(user) && "secret".equals(pass)) {
            HttpSession session = req.getSession();       // create if absent
            session.setAttribute("user", user);
            session.setMaxInactiveInterval(30*60);       // 30-minute timeout
            resp.sendRedirect("dashboard.jsp");
        } else {
            resp.sendRedirect("login.jsp?error=invalid");
        }
    }
}