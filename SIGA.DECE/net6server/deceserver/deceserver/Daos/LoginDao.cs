using deceserver.Models;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;

namespace deceserver.Daos
{
    public class LoginDao : ConnectionDB
    {
        private StructureResponse _result = new StructureResponse();
        public async Task<StructureResponse> PostAsync(AuthModel auth)
        {
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspLogin", con))
                {
                    cmd.Parameters.AddWithValue("authClientJson", JsonConvert.SerializeObject(auth));
                    cmd.CommandType = CommandType.StoredProcedure;
                    await con.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            _result.code = reader.GetString(0);
                            _result.message = reader.GetString(1);
                            _result.messageTitle = reader.GetString(2);
                            if (_result.code == "1")
                            {
                                auth.idSucursal = reader.GetInt32(3);
                                auth.idUsuario = reader.GetInt32(4);
                                auth.codUsuario = reader.GetString(5);
                                auth.contrasena = reader.GetString(6);
                                auth.nombreUsuario = reader.GetString(7);
                                auth.idRol = reader.GetInt32(8);
                                auth.nombreRol = reader.GetString(9);
                                _result.redirectTo = reader.GetString(10);// parametro requerido
                            }
                        }
                    }
                }
                _result.payload = auth;
            }
            catch (Exception e)
            {
                _result.toString("0", "Problemas en el proceso de la solicitud", "Error de excepción", e.Message);
            }
            finally
            {
                await con.CloseAsync();
            }
            return _result;
        }

        public async Task<List<RolModel>> GetRolesAsync(int idUsuario)
        {
            var roles = new List<RolModel>();
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspLoginRolListar", con))
                {
                    cmd.Parameters.AddWithValue("idUsuario", idUsuario);
                    cmd.CommandType = CommandType.StoredProcedure;
                    await con.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var item = new RolModel();
                            item.idAcceso = reader.GetInt32(0);
                            item.idSucursal = reader.GetInt32(1);
                            item.predeterminado = reader.GetBoolean(2);
                            item.idUsuario = reader.GetInt32(3);
                            item.codUsuario = reader.GetString(4);
                            item.nombreCompleto = reader.GetString(6);
                            item.idRol = reader.GetInt32(7);
                            item.descripcion = reader.GetString(8);
                            roles.Add(item);// parametro requerido
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _ = e.Message;
            }
            finally
            {
                await con.CloseAsync();
            }
            return roles;
        }

        public async Task<List<MenuModel>> GetMenusAsync(int idRol)
        {
            var menus = new List<MenuModel>();
            try
            {

                using (SqlCommand cmd = new SqlCommand("uspLoginMenuListar", con))
                {
                    cmd.Parameters.AddWithValue("idRol", idRol);
                    cmd.CommandType = CommandType.StoredProcedure;
                    await con.OpenAsync();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var item = new MenuModel();
                            item.idMenuAcceso = reader.GetInt32(0);
                            item.idMenu = reader.GetInt32(1);
                            item.menuName = reader.GetString(2);
                            item.url = reader.GetString(3);
                            item.icon = reader.GetString(4);
                            menus.Add(item);// parametro requerido
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _ = e.Message;
            }
            finally
            {
                await con.CloseAsync();
            }
            return menus;
        }

    }

}
