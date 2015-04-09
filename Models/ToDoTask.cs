using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngualrJSWebAPIApp.Models
{
    public class ToDoTask
    {
        //  [TaskId]
        //,[TaskName]
        //,[CustomerId]
        //,[DateTime]
        //,[TaskStatus]

        public int Id { get; set; }
        public string TaskName { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime TaskDate { get; set; }
        public int TaskStatus { get; set; } //int 0 Unassigned,1 Assigned,2 Process,3 Done,
    }
    //public class CustomerTodoContext : DbContext
    //{
    //    public CustomerTodoContext()
    //        : base("DefaultConnection")
    //    {
    //    }
    //    public DbSet<ToDoTask> CustomerTasks { get; set; }
    //}
}
