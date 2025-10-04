using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MSDCollegePali.Model;

namespace Application.Interfaces.Service
{
    public interface IRegistrationRepository
    {
        Task<string> SaveUserRegistrationDetails(RegistrationModel model);
    }
}
