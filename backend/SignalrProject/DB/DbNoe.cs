
using SignalrProject.Controllers.Dto;
using System.Text.Json;

namespace SignalrProject.DB
{
    public class DbNoe
    {
        private const string _connStr = "Data Source=DB/dbData.db";

        public void AddMsg(string msg)
        {
            using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"INSERT INTO NoeMsg (Msg) VALUES ($msg);";
                command.Parameters.AddWithValue("$msg", msg);
                var reader = command.ExecuteReader();
            }
        }
        public List<WeddingMsgDto> AllMsg()
        {
            var weddingMsg = new List<WeddingMsgDto>();
            using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM NoeMsg";
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
        public Dictionary<string, int> LoadFantasticWords()
        {
            var weddingMsg = new Dictionary<string, int>();
            using (var connection = new Microsoft.Data.Sqlite.SqliteConnection(_connStr))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"SELECT * FROM successWordNoe";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var id = reader.GetInt32(0);
                        string word = reader.GetString(1);
                        weddingMsg.Add(word, id);
                    }
                }
            }
            return weddingMsg;

        }
    }
}
