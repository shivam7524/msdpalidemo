using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class EnqueryModel
    {
        public int Enqueryid { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public int Course { get; set; }
        public string? CourseName { get; set; }
        public string? EnqueryOn { get; set; }
        public DataTable dt { get; set; }
        public bool IsContact { get; set; }
    }
    public class EnqueryPara
    {
        public int Enqueryid { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public int Course { get; set; }
        public string? EnqueryOn { get; set; }
        public int Action { get; set; }
    }
    public class DisplayEnquery
    {
        public List<EnqueryModel>? getEnqueryList { get; set; }
    }
    public class GallaryMaster
    {

        public DataTable dt { get; set; }
        public string Action { get; set; }
        public int Id { get; set; }
        public int Position { get; set; }
        public string ImageName { get; set; }
        public IFormFile Imagefile { get; set; }
        public string Image { get; set; }


    }
}
