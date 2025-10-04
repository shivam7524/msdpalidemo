using Application.Services;
using Dapper;
using Infrastructure.Utility;
using Model;
using System.Data;
using System.Reflection;

namespace Infrastructure.Repository
{
    public class InqueryRepository: IInqueryRepository
    {
        private readonly DapperContext _dapperContext;
        public InqueryRepository(DapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }
        public async Task<DisplayEnquery> GetEnquery()
        {
            try
            {
                var connection = _dapperContext.CreateConnection();
                string proc = "msd_getenquery";
                var param = new DynamicParameters();
                var res = (await connection.QueryAsync<EnqueryModel>(proc, param, commandType: CommandType.StoredProcedure)).ToList();
                if (res != null)
                {
                    return new DisplayEnquery
                    {
                        getEnqueryList = res
                    };
                }
            }
            catch (Exception ex)
            {

                return null;
            }
           
            return new DisplayEnquery();
        }
        public async Task<string> SaveEnquery(EnqueryPara model)
        {
            var res = "";
            try
            {
                var connection = _dapperContext.CreateConnection();
                string proc = "MSD_SaveEnquery";
                var param = new DynamicParameters();
                param.Add("@Name", model.Name);
                param.Add("@Mobile", model.Mobile);
                param.Add("@Email", model.Email);
                param.Add("@Course", model.Course);
                param.Add("@EnqueryId", model.Enqueryid);
                param.Add("@Action", model.Action);
                res = (await connection.QueryAsync<string>(proc, param, commandType: CommandType.StoredProcedure)).FirstOrDefault();
            }
            catch (Exception ex)
            {

               return null;
            }
            
            if (res != null)
            {
                return res;
            }
            return string.Empty;
        }
        public async Task<DataTable> getimagelist(GallaryMaster model)
        {
            try
            {
                using (var connection = _dapperContext.CreateConnection())
                {
                    string proc = "Proc_GalleryMaster";
                    var param = new DynamicParameters();
                    param.Add("@Position", model.Position);
                    param.Add("@Image", model.Image);
                    param.Add("@Action", model.Action);

                    using (var reader = await connection.ExecuteReaderAsync(proc, param, commandType: CommandType.StoredProcedure))
                    {
                        var dataTable = new DataTable();
                        dataTable.Load(reader);
                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                // Optionally log exception
                return null;
            }
        }
        public Task<string> SaveUpdateGallery(GallaryMaster model)
        {
            var res = "";
            try
            {
                var connection = _dapperContext.CreateConnection();
                string proc = "Proc_GalleryMaster";
                var param = new DynamicParameters();
                param.Add("@Position", model.Position);
                param.Add("@Image", model.Image);
                param.Add("@Action", model.Action);

                res = connection.Query<string>(proc, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                return Task.FromResult<string>(null);
            }

            if (res != null)
            {
                return Task.FromResult(res);
            }
            return Task.FromResult(string.Empty);
        }
    }
}
