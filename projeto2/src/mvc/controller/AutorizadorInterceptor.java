package mvc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AutorizadorInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object controller)
			throws Exception {
		String uri = request.getRequestURI();
		if (uri.endsWith("loginform") || uri.endsWith("login") || uri.endsWith("loginform") || uri.endsWith("signup") || uri.endsWith("register")) {
			return true;
		}
		if (request.getSession().getAttribute("userlogged") != null) {
			return true;
		}

		// if (uri.endsWith("signup")) {
		// response.sendRedirect("signup");
		// return true;
		// }

		response.sendRedirect("loginform");
		return false;
	}
}