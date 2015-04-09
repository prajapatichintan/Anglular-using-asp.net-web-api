using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AngualrJSWebAPIApp.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    public class CustomerContext : DbContext
    {
        public CustomerContext()
            : base("DefaultConnection")
        {
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ToDoTask> CustomerTasks { get; set; }

    }
}