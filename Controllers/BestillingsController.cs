using System;
using System.Threading.Tasks;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Gruppeoppgave1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gruppeoppgave1.Controllers
{
    [Route("api/Bestilling")]
    public class BestillingsController:ControllerBase
    {
        
        private readonly MyDBContext _db;

        public BestillingsController(MyDBContext db)
        {
            _db = db;
        }

        [HttpGet("{int id}")]
        public Bestilling hentBestilling(int id)
        {
            var bestilling = _db.Bestillinger.Find(id);
            return bestilling;
        }
        
        [HttpPost]
        public async Task<ActionResult> AddBestilling([FromBody]Bestilling bestilling)
        {
            Console.WriteLine("Ny bestilling: ");
            Console.WriteLine(bestilling);

            try
            {
                _db.Bestillinger.Add(bestilling);
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                return Problem();
            }
        }

    }
}