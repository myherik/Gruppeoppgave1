using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Post
    {
        [Key] 
        [RegularExpression("^([0-9]{4})$")]
        public string PostNummer { get; set; }
        [Required]
        public string PostSted { get; set; }
    }
}