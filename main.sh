if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters"
fi

echo "${1-}" > "config.txt"

dotnet build "StockAnalyzer/StockAnalyzer.csproj"

spark-submit --class org.apache.spark.deploy.dotnet.DotnetRunner --master local StockAnalyzer/bin/Debug/net6.0/microsoft-spark-3-0_2.12-1.0.0.jar dotnet StockAnalyzer/bin/Debug/net6.0/StockAnalyzer.dll

python3 -m http.server
