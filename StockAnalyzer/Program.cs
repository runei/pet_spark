using System.Collections;
using System.Net.NetworkInformation;
using Microsoft.Spark.Sql;
using Microsoft.Spark.Sql.Expressions;

var path = "";
using (var sr = new StreamReader("config.txt"))
{
    path = sr.ReadLine();
}

SparkSession Spark = SparkSession
                           .Builder()
                           .GetOrCreate();

DataFrame df = Spark
    .Read()
    .Option("inferSchema", true)
    .Csv(path);
// .Csv("BTCUSDT.csv");
df = df.Drop("_c1", "_c2", "_c3", "", "_c6", "_c7", "_c8", "_c9", "_c10", "_c11");
// df = df.ToDF("time", "open", "high", "low", "close", "volume");
df = df.ToDF("time", "close", "volume");

// DataFrame df_open = df.Select("time", "close");

DataFrame temp = df.GroupBy("close").Sum("volume").Sort(Functions.Desc("sum(volume)"));

var i = 1;
foreach (var row in temp.Head(5))
{
    var name = "POC" + i.ToString();
    df = df.WithColumn(name, Functions.Lit(row[0].ToString()));
    i++;
}

var w = Window.OrderBy("time");
df = df.WithColumn("change", Functions.Col("close") - Functions.Lag("close", 1).Over(w));
df = df.WithColumn("obv_temp", Functions.Expr("case when change > 0 then volume else (-volume) end"));
df = df.WithColumn("obv", Functions.Col("obv_temp") + Functions.Lag("obv_temp", 1).Over(w));
df = df.Drop("obv_temp");

var lower = Double.Parse(df.Select(Functions.Min("close")).First()[0].ToString());
var higher = Double.Parse(df.Select(Functions.Max("close")).First()[0].ToString());

var fib_382 = higher - ((higher - lower) * 0.382);
var fib_5 = higher - ((higher - lower) * 0.5);
var fib_618 = higher - ((higher - lower) * 0.618);
var fib_786 = higher - ((higher - lower) * 0.786);

df = df.WithColumn("fib_382", Functions.Lit(fib_382));
df = df.WithColumn("fib_5", Functions.Lit(fib_5));
df = df.WithColumn("fib_618", Functions.Lit(fib_618));
df = df.WithColumn("fib_786", Functions.Lit(fib_786));

// df.PrintSchema();
// df.Show();

df.Write().Csv("output_small");
