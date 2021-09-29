using System.Collections.Generic;
using System.Threading.Tasks;
using Gruppeoppgave1.Models;

namespace Gruppeoppgave1.DAL
{
    public interface IBestillingRepo
    {

        Task<List<Bestilling>> HentAlle();

        Task<Bestilling> HentEn(int id);

        Task<Bestilling> LeggTil(Bestilling bestilling);

        Task Endre(int id, Kunde kunde);
        
        Task<int> Slett(int id);

        Task<int> Lagre();

    }
}