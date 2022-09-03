
using SignalrProject.Controllers.Dto;

namespace SignalrProject.DB
{
    public class DbClients
    {
        private const string _connStr = "Data Source=DB/dbData.db";

        public void AddMsg(string msg)
        {
            using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"INSERT INTO users (Msg) VALUES ($msg);";
                command.Parameters.AddWithValue("$msg", msg);
                var reader = command.ExecuteReader();
            }
        }
        public bool DeleteMessage(int msgId)
        {
            try
            {
                using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = @"DELETE FROM users WHERE Id=$msg;";
                    command.Parameters.AddWithValue("$msg", msgId);
                    var reader = command.ExecuteReader();
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public List<WeddingMsgDto> AllMsg()
        {
            var weddingMsg = new List<WeddingMsgDto>();
            using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"SELECT *FROM users";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var id = reader.GetInt32(0);
                        var msg = reader.GetString(1);
                        weddingMsg.Add(new WeddingMsgDto(id, msg));
                    }
                }
            }
            return weddingMsg;
        }
    }
}
