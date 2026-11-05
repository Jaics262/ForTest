namespace ClassLibrary2;

public static class TextTools
{
    public static string Reverse(string value)
    {
        ArgumentNullException.ThrowIfNull(value);
        return string.Concat(value.Reverse());
    }

    public static bool IsPalindrome(string value)
    {
        ArgumentNullException.ThrowIfNull(value);

        var normalized = new string(value
            .Where(char.IsLetterOrDigit)
            .Select(char.ToLowerInvariant)
            .ToArray());

        return normalized.SequenceEqual(normalized.Reverse());
    }

    public static int WordCount(string value)
    {
        ArgumentNullException.ThrowIfNull(value);

        if (string.IsNullOrWhiteSpace(value))
            return 0;

        return value.Split([' ', '\t', '\r', '\n'], StringSplitOptions.RemoveEmptyEntries).Length;
    }
}
