using AngualrJSWebAPIApp.DatabaseAccess;
using AngualrJSWebAPIApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngualrJSWebAPIApp.Controllers
{
    public class TaskController : ApiController
    {
        CommonDb objcommondb = new CommonDb();
        [HttpGet]
        public IEnumerable<ToDoTask> Get()
        {
            return objcommondb.GetTodoList();
        }
        [HttpGet]
        public ToDoTask GetByID(int id)
        {
            return objcommondb.GetTodoByID(id);
        }
        [HttpGet]
        public string update(int id, bool status)
        {
            try
            {
                objcommondb.UpdateTodoStatus(id, status);
                return "Update SuccessFully.";
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }
        public string Put(string id, [FromBody]ToDoTask objtask)
        {
            try
            {
                objcommondb.UpdateToDoTask(objtask);
                return "Update SuccessFully.";
            }
            catch (DbUpdateConcurrencyException e)
            {
                return e.Message.ToString();
            }
        }
        public string Post([FromBody]ToDoTask objtask)
        {
            try
            {
                if (!string.IsNullOrEmpty(objtask.TaskName))
                {
                    objcommondb.InsertTodoTask(objtask);
                    return "Task Inserted Successfully.";
                }
                else
                {
                    return "Task Name required";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        }


    }
}
