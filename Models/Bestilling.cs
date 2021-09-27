using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Gruppeoppgave1.Models
{
    public class Bestilling
    {
        public int Id { get; set; }
        [Required]
        public string Ferjestrekning { get; set; }
        [Required]
        public string UtreiseDato { get; set; }
        public string HjemreiseDato { get; set; }
        public string Registreringsnummer { get; set; }
        [Required]
        public virtual List<Voksen> Voksne { get; set; }
        public virtual List<Barn> Barn { get; set; }
        
        public override string ToString()
        {
            return $"Id:{Id}, Ferjestrekning:{Ferjestrekning}, Utreisedato:{UtreiseDato}, HjemreiseDato:{HjemreiseDato}, " +
                   $"Registreringsnummer:{Registreringsnummer}, Voksne:{string.Join(",", Voksne)}, Barn:{string.Join(",", Barn)}";
        }
    }
}