using System.ComponentModel.DataAnnotations;

namespace Gruppeoppgave1.Models
{
    public class Post
    {
        [Key] 
        public int PostNummer { get; set; }
        [Required]
        public string PostSted { get; set; }
    }
}