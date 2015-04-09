using AngualrJSWebAPIApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Web.Helpers;
using AngualrJSWebAPIApp.DatabaseAccess;
namespace AngualrJSWebAPIApp
{
    public class CustomerController : ApiController
    {
        // GET api/<controller>
        CommonDb objcommon = new CommonDb();
        public IEnumerable<Customer> Get()
        {
            return objcommon.GetAllCustomer();
        }

        // POST api/<controller>
        public string Post([FromBody]Customer customer)
        {
            try
            {
               
                if (!string.IsNullOrEmpty(customer.Name))
                {
                    customer.Id = objcommon.GetMaxCustomerId();
                    objcommon.InsertCustomer(customer);
                    return "customer Inserted Successfully.";
                }
                else
                {
                    return "customer name required";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        }

        // PUT api/<controller>/5
        public string Put(string id, [FromBody]Customer customer)
        {
            try
            {
               objcommon.UpdateCustomer(customer);
                return "Update SuccessFully.";
            }
            catch(Exception c)
            {
                return c.Message.ToString();
            }
        }

        // DELETE api/<controller>/5
        public string Delete(int id)
        {
            try {
                objcommon.DeleteCustomer(id);
                return "Delete Successfully.";
            }
            catch (Exception e){
                return e.Message.ToString();
            }
            
        }
    }
}