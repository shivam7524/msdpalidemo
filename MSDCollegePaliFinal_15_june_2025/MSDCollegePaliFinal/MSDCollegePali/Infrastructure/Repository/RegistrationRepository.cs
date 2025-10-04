using Application.Interfaces.Service;
using MSDCollegePali.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Utility;

namespace Infrastructure.Repository
{
    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly DapperContext _dapperContext;
        public RegistrationRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<string> SaveUserRegistrationDetails(RegistrationModel model)
        {
            try
            {
                var res = "";
                var connection = _dapperContext.CreateConnection();
                //string proc = "Usp_SaveInvitedPersonDetails";
                string proc = "[SP_InsertStudentsDetails]";
                var param = new DynamicParameters();
                param.Add("@Name", model.Name);
                param.Add("@Gender", model.Gender);
                param.Add("@MobileNo", model.MobileNo);
                param.Add("@Email", model.Email);
                param.Add("@Password", model.Password);
                param.Add("@City", model.City);
                param.Add("@State", model.State);
                param.Add("@PinCode", model.PinCode);
                param.Add("@Address", model.Address);
                param.Add("@Action", model.Action);
                res = (await connection.QueryAsync<string>(proc, param, commandType: CommandType.StoredProcedure)).FirstOrDefault();
                if (res != null)
                {
                    return res;
                }
            }
            catch (Exception ex)
            {

                return string.Empty; 
            }
           
            return string.Empty;
        }
    }
}
