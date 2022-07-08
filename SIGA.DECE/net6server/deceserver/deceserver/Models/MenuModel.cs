namespace deceserver.Models
{
    public class MenuModel
    {
        public int idMenuAcceso { get; set; }
        public int idMenu { get; set; }
        public string menuName { get; set; } = string.Empty;
        public string url { get; set; } = string.Empty;
        public string? icon { get; set; } = null;
    }
}
