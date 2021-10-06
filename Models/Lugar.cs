using System.ComponentModel.DataAnnotations;

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
        public virtual Reise Reise { get; set; }
    }
}