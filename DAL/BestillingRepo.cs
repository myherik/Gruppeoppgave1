using System;
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

        public async Task<Bestilling> HentEnByRef(string referanse)
        {
            var bestilling = await _db.Bestillinger
                .FirstOrDefaultAsync(b => b.Referanse == referanse);

            return bestilling;

        }

        public async Task<Bestilling> LeggTil(Bestilling bestilling)
        {
            // teste for unik Refereanse
            bool uniq = false;
            int teller = 0;
            do
            {
                uniq = _db.Bestillinger
                    .FirstOrDefaultAsync(b => b.Referanse == bestilling.Referanse).Result == null;
                if (!uniq)
                {
                    bestilling.Referanse = Guid.NewGuid().ToString().Split("-")[0];
                    teller++;
                }
            } while (!uniq);
            Console.WriteLine($"--> Vi må loope {teller} ganger");

            bestilling.LugarType = await _db.Lugarer.FirstOrDefaultAsync(l => l.Id == bestilling.LugarType.Id);
            bestilling.KontaktPerson.Post = await _db.PostSteder.FindAsync(bestilling.KontaktPerson.Post.PostNummer);
            
            _db.Bestillinger.Add(bestilling);
            await _db.SaveChangesAsync();
            return bestilling;
        }

        public async Task Endre(int id, Kunde kunde)
        {
            var besilling = await _db.Bestillinger.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<int> Lagre()
        {
            return await _db.SaveChangesAsync();
        }

        public async Task<int> Slett(int id)
        {
            var bestilling = await _db.Bestillinger.FirstOrDefaultAsync(b => b.Id == id);
            _db.Bestillinger.Remove(bestilling);

            return await _db.SaveChangesAsync();
        }
    }
}