using Microsoft.AspNetCore.Mvc;

namespace MSDCollegePali.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
