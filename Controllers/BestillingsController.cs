using System;
using System.Threading.Tasks;
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
        [HttpPost]
        public async Task<ActionResult> AddBestilling([FromBody]Bestilling bestilling)
        {
            Console.WriteLine("Ny bestilling: ");
            Console.WriteLine(bestilling);
            return Ok();
        }

    }
}