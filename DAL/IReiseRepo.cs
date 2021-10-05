using System.Collections.Generic;
using System.Threading.Tasks;
using Gruppeoppgave1.Models;

namespace Gruppeoppgave1.DAL
{
    public interface IReiseRepo
    {
        Task<bool> AddOne(Reise reise);

        Task<List<Reise>> GetAll();
    }
}