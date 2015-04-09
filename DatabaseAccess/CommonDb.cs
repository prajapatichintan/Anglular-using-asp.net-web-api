using AngualrJSWebAPIApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngualrJSWebAPIApp.DatabaseAccess
{

    public class CommonDb
    {
        CustomerContext customersdb = new CustomerContext();
        #region "Customer"
        public Customer GetCustomerById(int id)
        {
            return customersdb.Customers.Find(id);
        }
        public List<Customer> GetAllCustomer()
        {
            return customersdb.Customers.ToList();
        }
        public List<ViewCostomers> GetAllCustomerGridPagging(int page = 1, int pageSize = 10, string WhereCondition = "", string OrderByExpression = "")
        {
            CustomerContext customersdb = new CustomerContext();
            var Result = customersdb.Database.SqlQuery<ViewCostomers>("Customer_Get @PageNo, @RecordsPerPage, @WhereCondition,@OrderByExpression",
                            new SqlParameter("PageNo", page),
                            new SqlParameter("RecordsPerPage", pageSize),
                         new SqlParameter("WhereCondition", ""),
                         new SqlParameter("OrderByExpression", OrderByExpression));
            return Result.ToList();

        }
        public int GetMaxCustomerId()
        {
            try
            {
                return customersdb.Customers.ToList().Max(o => o.Id);
            }
            catch
            {
                return 1;
            }

        }
        public Customer InsertCustomer(Customer objCustomer)
        {

            customersdb.Customers.Add(objCustomer);
            customersdb.SaveChanges();
            return objCustomer;
        }
        public Customer UpdateCustomer(Customer objCustomer)
        {
            customersdb.Entry(objCustomer).State = EntityState.Modified;
            customersdb.SaveChanges();
            return objCustomer;
        }
        public bool DeleteCustomer(int CustomerId)
        {
            var objCustomer = customersdb.Customers.Find(CustomerId);
            customersdb.Customers.Remove(objCustomer);
            customersdb.SaveChanges();
            return true;
        }
        #endregion

        #region" TODO Task"
        public List<ToDoTask> GetTodoList()
        {
            return customersdb.CustomerTasks.ToList();
        }
        public ToDoTask GetTodoByID(int id)
        {
            return customersdb.CustomerTasks.Find(id);
        }
        public bool UpdateTodoStatus(int id, bool Status)
        {
            try
            {
                var objtask = customersdb.CustomerTasks.Find(id);
                if (Status)
                {
                    objtask.TaskStatus = 1;
                }
                else
                {
                    objtask.TaskStatus = 0;
                }
                customersdb.Entry(objtask).State = EntityState.Modified;
                customersdb.SaveChanges();
                return true;
            }
            catch
            {
                throw;
            }

        }

        public ToDoTask UpdateToDoTask(ToDoTask objtask)
        {
            var Customer = GetCustomerById(objtask.CustomerId);
            objtask.CustomerName = Customer.Name;
            CustomerContext customersdb = new CustomerContext();
            customersdb.Entry(objtask).State = EntityState.Modified;
            customersdb.SaveChanges();
            return objtask;
        }
        public ToDoTask InsertTodoTask(ToDoTask objtask)
        {
            var Customer = GetCustomerById(objtask.CustomerId);
            objtask.CustomerName = Customer.Name;
            customersdb.CustomerTasks.Add(objtask);
            customersdb.SaveChanges();
            return objtask;
        }

        #endregion
    }
}
