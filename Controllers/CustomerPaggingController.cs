using AngualrJSWebAPIApp.DatabaseAccess;
using AngualrJSWebAPIApp.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngualrJSWebAPIApp.Controllers
{
    public class CustomerPaggingController : ApiController
    {
        CommonDb objDataAccess = new CommonDb();
        public List<ViewCostomers> Get(int page = 1, int pageSize = 10, string WhereCondition = "", string OrderByExpression = "")
        { 
            return objDataAccess.GetAllCustomerGridPagging(page, pageSize, WhereCondition, OrderByExpression);
        }
    }
}
