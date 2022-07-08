namespace deceserver.Models
{
    public class LogInVIewModel
    {
        public List<RolModel>? roles { get; set; }
        public List<MenuModel>? menus { get; set; }
        public string? token { get; set; } = null;
        //public string? redirectUrl { get; set; } = null;
    }
}
