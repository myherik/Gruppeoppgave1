using System;
using System.Threading.Tasks;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gruppeoppgave1.Controllers
{
    [ApiController]
    [Route("api/bestilling")]
    public class BestillingsController:ControllerBase
    {
        
        private readonly IBestillingRepo _db;

        public BestillingsController(IBestillingRepo db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult> HentAlle()
        {
            var bestillinger = await _db.HentAlle();
            return Ok(bestillinger);
        }

        [HttpGet("{id}", Name ="HentBestilling")]
        public async Task<ActionResult> HentBestilling(int id)
        {
            var bestilling = await _db.HentEn(id);
            if (bestilling != null)
            {
                return Ok(bestilling);
            }
            
            return NotFound();
        }
        
        [HttpPost]
        public async Task<ActionResult> AddBestilling([FromBody]Bestilling bestilling)
        {
            /*if (!ModelState.IsValid)
            {
                return BadRequest();
            }*/
            var returBestilling = await _db.LeggTil(bestilling);

            return CreatedAtRoute(nameof(HentBestilling), new {Id = returBestilling.Id}, returBestilling);
        }

    }
}