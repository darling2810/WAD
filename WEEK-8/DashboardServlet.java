import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class DashboardServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);    // no new session
        resp.setContentType("text/html");
        if (session != null && session.getAttribute("user") != null) {
            String user = (String) session.getAttribute("user");
            resp.getWriter().println("<h1>Welcome, " + user + "!</h1>");
            resp.getWriter().println("<a href='logout'>Logout</a>");
        } else {
            resp.sendRedirect("login.jsp");
        }
    }
}