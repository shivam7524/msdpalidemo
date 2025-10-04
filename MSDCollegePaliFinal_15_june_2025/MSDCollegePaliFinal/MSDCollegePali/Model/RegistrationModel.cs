using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MSDCollegePali.Model
{
    public class RegistrationModel
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public string? MobileNo { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Address { get; set; }
        public int Action { get; set; }
        public int PinCode { get; set; }
        public DateTime RegisteredOn { get; set; }
        public string? Msg { get; set; }
        public DateTime DateofBirth { get; set; }
    }
}
