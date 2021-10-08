using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Gruppeoppgave1.Models
{
    public class Bestilling
    {
        public int Id { get; set; }
        public string Referanse { get; set; }
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        [Required]
        public string UtreiseDato { get; set; }
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        public string HjemreiseDato { get; set; }
        public int Pris { get; set; }
        [RegularExpression("^[A-Z]{2}\\s[1-9]{1}[0-9]{4}$")]
        public string Registreringsnummer { get; set; }
        [Required]
        public int AntallLugarer { get; set; }
        [Required]
        public int ReiseId { get; set; }
        [ValidateNever]
        [IgnoreDataMember]
        public virtual Reise Reise { get; set; }
        // this is for serving ferjestrekining to client without returning reise
        [NotMapped] 
        public string Ferjestrekning => $"{Reise?.Strekning}";
        [ValidateNever]
        public virtual Lugar LugarType { get; set; }
        [Required] 
        public virtual KontaktPerson KontaktPerson { get; set; }
        public virtual List<Voksen> Voksne { get; set; }
        public virtual List<Barn> Barn { get; set; }
        
        public override string ToString()
        {
            return $"Id:{Id} Reise: {ReiseId}";

        }
    }
}