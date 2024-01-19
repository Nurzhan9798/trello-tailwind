import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

type Mode = "production" | "development";
interface EnvVariables {
  mode: Mode;
}

module.exports = (env: EnvVariables) => {
  const config = {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      preferAbsolute: true,
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      mainFiles: ["index"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devServer: {
      port: 3000,
      open: true,
    },
  };
  return config;
};
