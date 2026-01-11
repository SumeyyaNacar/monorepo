export const appConfig = {
  project: {
    name: "Frontend Auth",
    version: "1.0.0",
    description: "Next.js 15 & LoopBack 4 Güvenli Kimlik Doğrulama Sistemi",
  },
  // Backend bağlantı ayarları
  apiURL: "http://localhost:3000",
  
  // Auth.js (NextAuth) için yönlendirme yolları
  auth: {
    loginPage: "/login",
    registerPage: "/register",
    dashboardPage: "/dashboard",
  },

  // İletişim (Opsiyonel, login sayfasının footer kısmında kullanılabilir)
  contact: {
    email: "admin@frontend-auth.com",
    github: "https://github.com/your-repo/frontend-auth",
  },
  	userRightsOnRoutes: [
		{
			urlRegex: /\/dashboard$/,
			
		},
  ]
}