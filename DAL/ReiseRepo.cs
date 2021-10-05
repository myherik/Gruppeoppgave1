using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gruppeoppgave1.Models;
using Microsoft.EntityFrameworkCore;

namespace Gruppeoppgave1.DAL
{
    public class ReiseRepo: IReiseRepo
    {
        private readonly MyDBContext _db;
        
        public ReiseRepo(MyDBContext db)
        {
            _db = db;
        }


        public async Task<bool> AddOne(Reise reise)
        {
            _db.Reiser.Add(reise);
            return (await _db.SaveChangesAsync()) > 0;
        }

        public async Task<List<Reise>> GetAll()
        {

            return await _db.Reiser.ToListAsync();
        }
    }
}