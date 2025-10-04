using Application.Services;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Model;
using MSDCollegePali.Models;
using System.Diagnostics;

namespace MSDCollegePali.Controllers
{
    public class HomeController : Controller
    {
        public readonly IInqueryRepository _IInqueryRepository;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IInqueryRepository iinqueryRepository)
        {
            _logger = logger;
            _IInqueryRepository = iinqueryRepository;
        }

        public async Task<IActionResult> Index()
        {
            GallaryMaster model = new GallaryMaster();

            model.Action = "3";

            model.dt = await _IInqueryRepository.getimagelist(model);

            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult AboutUs()
        {
            return View();
        }
        public IActionResult FounderMessage()
        {
            return View();
        }
        public IActionResult PrincipalMessage()
        {
            return View();
        }
        public IActionResult ManagerMessage()
        {
            return View();
        }
        public IActionResult Managementcommittee()
        {
            return View();
        }
        public IActionResult BachelorofArt()
        {
            return View();
        }
        public IActionResult BachelorofScience()
        {
            return View();
        }
        public IActionResult MasterofArt()
        {
            return View();
        }
        public IActionResult AcademicDetails()
        {
            return View();
        }
        public IActionResult AcademicCalender()
        {
            return View();
        }
        public IActionResult AcademicStaff()
        {
            return View();
        }
        public IActionResult FeeDetails()
        {
            return View();
        }
        public IActionResult ListofStudents()
        {
            return View();
        }
        public IActionResult CollegeFacilities()
        {
            return View();
        }
        public IActionResult CollegeActivities()
        {
            return View();
        }
        public IActionResult NationalServicesScheme()
        {
            return View();
        }
        public IActionResult CollegeGallery()
        {
            return View();
        }
        public IActionResult GalleryVideo()
        {
            return View();
        }
        public IActionResult ContactUs()
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> SaveEnquery(EnqueryPara model)
        {
            var result = "";
            var msg = "";
            result = await _IInqueryRepository.SaveEnquery(model);
            if (result != null && result != "")
            {
                var jsonData = new
                {
                    success = true,
                    msg = model.Action,
                    data = result,
                };
                return Json(jsonData);
            }
            else
            {
                var jsonData = new
                {
                    success = false,
                    msg = model.Action,
                    data = result,
                };
                return Json(jsonData);
            }
        }
    }
}
