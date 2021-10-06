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
        public DbSet<KontaktPerson> Type { get; set; }
        public DbSet<Bestilling> Bestillinger { get; set; }
        public DbSet<Reise> Reiser { get; set; }
        public DbSet<Lugar> Lugarer { get; set; }
        public DbSet<Post> PostSteder { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}