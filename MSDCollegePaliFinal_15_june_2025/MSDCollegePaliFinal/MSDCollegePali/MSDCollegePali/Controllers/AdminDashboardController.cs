using Application.Services;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Data;

namespace MSDCollegePali.Controllers
{
    public class AdminDashboardController : Controller
    {
        private readonly IInqueryRepository _inqueryRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AdminDashboardController(IInqueryRepository inqueryRepository, IWebHostEnvironment webHostEnvironment)
        {
            _inqueryRepository = inqueryRepository;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult AdminDashboard()
        {
            return View();
        }

        public async Task<IActionResult> Events(GallaryMaster model)
        {
            model.Action = "3";

            model.dt = await _inqueryRepository.getimagelist(model);

            return View(model);
        }


        [HttpGet]
        public async Task<JsonResult> GetEnquery()
        {
            
            var getEnqueryList = await _inqueryRepository.GetEnquery();
            if (getEnqueryList != null)
            {
                var jsonData = new
                {
                    data = getEnqueryList.getEnqueryList,
                };
                return Json(jsonData);
            }
            return Json(null);
        }

        public async Task<JsonResult> UploadImage(GallaryMaster model)
        {
            string msg = "";

            if (model.Imagefile != null && model.Imagefile.Length > 0)
            {
                try
                {
                    string fileName = Path.GetFileName(model.Imagefile.FileName);
                    string fileExtension = Path.GetExtension(fileName);
                    string uniqueFileName = Guid.NewGuid().ToString() + fileExtension;

                    string folderPath = Path.Combine(_webHostEnvironment.WebRootPath, "Files");

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string filePath = Path.Combine(folderPath, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.Imagefile.CopyToAsync(fileStream);
                    }

                    msg = uniqueFileName;
                }
                catch (Exception ex)
                {
                    msg = "Error: " + ex.Message;
                }
            }
            else
            {
                msg = "No image selected or the file is empty.";
            }

            return Json(msg);
        }


        public async Task<JsonResult> SaveUpdateGallery(GallaryMaster model)
        {
            model.Action = "2";

            var result = await _inqueryRepository.SaveUpdateGallery(model);

            if (!string.IsNullOrEmpty(result))
            {
                return Json(result);
            }
            return Json(new { message = "Failed" });
        }


        public async Task<JsonResult> Getimagebypostion(GallaryMaster model)
        {
            model.Action = "1";

            var result = await _inqueryRepository.SaveUpdateGallery(model);

            if (!string.IsNullOrEmpty(result))
            {
                return Json(result); // return the actual image path
            }
            else
            {
                result = "/files/download.png"; // fallback image path
                return Json(result);
            }

        }
    }
}
