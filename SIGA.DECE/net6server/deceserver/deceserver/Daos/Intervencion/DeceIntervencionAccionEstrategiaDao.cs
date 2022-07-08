using deceserver.Models;
using System.Data;
using System.Data.SqlClient;
namespace deceserver.Daos.Intervencion
{
    public class DeceIntervencionAccionEstrategiaDao : ConnectionDB
    {
        private StructureResponse _result = new StructureResponse();
        public async Task<StructureResponse> GetAsync(string authClientJson, string identifierFormJson)
        {
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspDeceIntervencionAccionEstrategiaGet", con))
                {
                    cmd.Parameters.AddWithValue("authClientJson", authClientJson);
                    cmd.Parameters.AddWithValue("identifierFormJson", identifierFormJson);
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
                                _result.payload = reader["payload"];

                        }
                    }
                }
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
        public async Task<StructureResponse> PostAsync(string authClientJson, string dataFormJson)
        {
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspDeceIntervencionAccionEstrategiaInsert", con))
                {
                    cmd.Parameters.AddWithValue("authClientJson", authClientJson);
                    cmd.Parameters.AddWithValue("dataFormJson", dataFormJson);
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
                                _result.payload = reader["payload"];

                        }
                    }
                }
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
        public async Task<StructureResponse> PutAsync(string authClientJson, string identifierFormJson, string dataFormJson)
        {
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspDeceIntervencionAccionEstrategiaUpdate", con))
                {
                    cmd.Parameters.AddWithValue("authClientJson", authClientJson);
                    cmd.Parameters.AddWithValue("identifierFormJson", identifierFormJson);
                    cmd.Parameters.AddWithValue("dataFormJson", dataFormJson);
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
                                _result.payload = reader["payload"];

                        }
                    }
                }
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
        public async Task<StructureResponse> DeleteAsync(string authClientJson, string identifierFormJson)
        {
            try
            {
                using (SqlCommand cmd = new SqlCommand("uspDeceIntervencionAccionEstrategiaDelete", con))
                {
                    cmd.Parameters.AddWithValue("authClientJson", authClientJson);
                    cmd.Parameters.AddWithValue("identifierFormJson", identifierFormJson);
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
                                _result.payload = reader["payload"];

                        }
                    }
                }
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

    }
}
