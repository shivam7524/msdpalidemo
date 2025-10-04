using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IInqueryRepository
    {
        Task<DisplayEnquery> GetEnquery();
       
        Task<string> SaveEnquery(EnqueryPara model);
        Task<string> SaveUpdateGallery(GallaryMaster model);
        Task<DataTable> getimagelist(GallaryMaster model);
        

    }
}
