using System;
using System.Threading.Tasks;
using Gruppeoppgave1.DAL;
using Gruppeoppgave1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Gruppeoppgave1.Controllers
{
    [ApiController]
    [Route("api/bestilling")]
    public class BestillingsController:ControllerBase
    {
        
        private readonly IBestillingRepo _db;
        private readonly ILogger<BestillingsController> _log;

        public BestillingsController(IBestillingRepo db, ILogger<BestillingsController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpGet]
        public async Task<ActionResult> HentAlle()
        {
            _log.LogInformation("HentAlle()");
            var bestillinger = await _db.HentAlle();
            return Ok(bestillinger);
        }

        [HttpGet("{id}", Name ="HentBestilling")]
        public async Task<ActionResult> HentBestilling(int id)
        {
            _log.LogInformation($"HentAlle({id})");
            var bestilling = await _db.HentEn(id);
            if (bestilling != null)
            {
                return Ok(bestilling);
            }
            
            return NotFound();
        }
        
        [HttpGet("ref/{referanse}")]
        public async Task<ActionResult> HentBestillingByRef(string referanse)
        {
            var bestilling = await _db.HentEnByRef(referanse);
            if (bestilling != null)
            {
                return Ok(bestilling);
            }

            return NotFound($"Bestilling ikke funnet på referanse: {referanse}");
        }

        [HttpPost]
        public async Task<ActionResult> AddBestilling([FromBody]Bestilling bestilling)
        {
            _log.LogInformation($"AddBestilling({bestilling})");
            bestilling.Referanse = Guid.NewGuid().ToString().Split("-")[0];
            var returBestilling = await _db.LeggTil(bestilling);

            return CreatedAtRoute(nameof(HentBestilling), new {Id = returBestilling.Id}, returBestilling);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditBestilling([FromBody] Bestilling bestilling, int id)
        {
            var dbBestilling = _db.HentEn(id).Result;
            if (dbBestilling != null)
            {
                dbBestilling.Ferjestrekning = bestilling.Ferjestrekning;
                dbBestilling.UtreiseDato = bestilling.UtreiseDato;
                dbBestilling.HjemreiseDato = bestilling.HjemreiseDato;
                dbBestilling.Registreringsnummer = bestilling.Registreringsnummer;
                dbBestilling.Barn = bestilling.Barn;
                dbBestilling.Voksne = bestilling.Voksne;
            }
            else
            {
                return BadRequest($"No bestilling found with id {id}");
            }

            int lagre = await _db.Lagre();
            if (lagre > 0)
            {
                return Ok(bestilling);
            }

            return BadRequest("No changes made");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBestilling(int id)
        {
            if (await _db.Slett(id) >= 0)
            {
                return NoContent();
            }

            return BadRequest("No changes made");
        }

    }
}