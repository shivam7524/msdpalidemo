using Application.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;
using MSDCollegePali.Model;

namespace MSDCollegePali.Controllers
{
    public class RegistrationController : Controller
    {
        private readonly IRegistrationRepository _registrationRepository;
        public RegistrationController(IRegistrationRepository registrationRepository)
        {
            _registrationRepository = registrationRepository;
        }
        public IActionResult StudentRegistration()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SaveUserRegistrationDetails(RegistrationModel model)
        {
            var result = "";
            model.Action = 1;
            result = await _registrationRepository.SaveUserRegistrationDetails(model);
            var jsonData = new
            {
                data = result,
            };
            return Json(jsonData);
        }
    }
}
