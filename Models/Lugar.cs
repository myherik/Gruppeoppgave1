using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Gruppeoppgave1.Models
{
    public class Lugar
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public int Pris { get; set; }
        [Required]
        public int Antall { get; set; }

        [Required]
        [IgnoreDataMember]
        public virtual Reise Reise { get; set; }
        public int ReiseId { get; set; }
    }
}