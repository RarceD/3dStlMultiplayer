using System.Text.Json;

namespace SignalrProject.Model
{
    public class Bulling
    {
        public List<string> _msg;
        private string _path = "Questions/bulling.json";
        public Bulling()
        {
            _msg = LoadJsonMsgs(_path);
        }
        public void AddMsg(string content)
        {
            _msg.Add(content);
            bool sucess = UpdateJsonMsgs();
        }
        public List<string> GetMsgs()
        {
            return _msg;
        }
        private bool UpdateJsonMsgs()
        {
            var a = JsonSerializer.Serialize<List<string>>(_msg);
            File.WriteAllText(_path, a);
            return true;
        }
        private static List<string> LoadJsonMsgs(string path)
        {
            try
            {
                string jsonString = File.ReadAllText(path);
                var msgs = JsonSerializer.Deserialize<string[]>(jsonString)!.ToList();
                return msgs;
            }
            catch (Exception)
            {
                Console.WriteLine("There is no file, gilipollas");
                return new List<string>();
            }
        }
    }
}
