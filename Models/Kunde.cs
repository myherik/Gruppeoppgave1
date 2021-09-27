using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Kunde
    {
        public int Id { get; set; }
        [Required]
        [RegularExpression("^([A-ZÆØÅ]{1}[a-zæøå]{0,}\\s{0,1}){1,}$")]
        public string Fornavn { get; set; }
        [Required]
        [RegularExpression("^[A-ZÆØÅ]{1}[a-zæøå]{0,}$")]
        public string Etternavn { get; set; }
        [Required]
        [RegularExpression("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$")]
        public string Foedselsdato { get; set; }

        public override string ToString()
        {
            return $"id:{Id}, Fornavn:{Fornavn}, Etternavn:{Etternavn}, Fødselsdato:{Foedselsdato}";
        }

    }
    
    public class Voksen: Kunde {}
    public class Barn: Kunde{}
}