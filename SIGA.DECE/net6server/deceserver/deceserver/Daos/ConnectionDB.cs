using System.Data.SqlClient;

namespace deceserver.Daos
{
    public class ConnectionDB
    {
        public static SqlConnection getConnection()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfiguration configuration = builder.Build();

            //string connectionString = configuration["ConnectionStrings:SIGA"];
            string connectionString = configuration["ConnectionStrings:Data"];

            var conn = new SqlConnection(connectionString);

            return conn;
        }
        public SqlConnection con = getConnection();
    }
}
