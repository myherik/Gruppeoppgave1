using Microsoft.EntityFrameworkCore;
using Gruppeoppgave1.Models;

namespace Gruppeoppgave1.DAL
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Barn> Barn { get; set; }
        public DbSet<Voksen> Voksne { get; set; }
        public DbSet<Bestilling> Bestillinger { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}