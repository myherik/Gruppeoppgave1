using System.Collections.Generic;
using System.Threading.Tasks;
using Gruppeoppgave1.Models;
using Microsoft.EntityFrameworkCore;

namespace Gruppeoppgave1.DAL
{
    public class BestillingRepo: IBestillingRepo
    {
        private readonly MyDBContext _db;

        public BestillingRepo(MyDBContext db)
        {
            _db = db;
        }
        
        public async Task<List<Bestilling>> HentAlle()
        {
            return await _db.Bestillinger.ToListAsync();
        }

        public async Task<Bestilling> HentEn(int id)
        {
            var bestilling = await _db.Bestillinger.FirstOrDefaultAsync(k => k.Id == id);

            return bestilling;
        }

        public async Task<Bestilling> LeggTil(Bestilling bestilling)
        {
            _db.Bestillinger.Add(bestilling);
            await _db.SaveChangesAsync();
            return bestilling;
        }

        public async Task Slett(int id)
        {
            var bestilling = await _db.Bestillinger.FirstOrDefaultAsync(b => b.Id == id);
            _db.Bestillinger.Remove(bestilling);
        }

        public async Task Endre(int id, Kunde kunde)
        {
            var besilling = await _db.Bestillinger.FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}